using MailKit.Security;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MimeKit.Text;
using MimeKit;
using Rentify.Data;
using Rentify.DTO;
using Rentify.Models;
using Microsoft.EntityFrameworkCore;
using Rentify.Repository;

namespace Rentify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisteredDto userRegisteredDto)
        {
            if (await _userRepository.UserExistsAsync(userRegisteredDto.Email))
            {
                return BadRequest("User already exists");
            }

            CreatePasswordHash(userRegisteredDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Firstname = userRegisteredDto.FirstName,
                Lastname = userRegisteredDto.LastName,
                Email = userRegisteredDto.Email,
                PhoneNumber = userRegisteredDto.PhoneNumber,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
            Random random = new Random();
            int randomNumber = random.Next(100000, 1000000);
            user.VerificationToken = CreateToken(user);
            user.OneTimeOTP = randomNumber;
            var Message = "Thank You For Registration ";
            CreateEmail(user.OneTimeOTP, userRegisteredDto.Email,Message);

            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("Verify")]
        public async Task<IActionResult> Verify(int Otp)
        {
            var user = await _userRepository.GetUserByVerificationTokenAsync(Otp);
            if (user == null)
            {
                return BadRequest("Invalid token");
            }

            user.VerifiedAt = DateTime.Now;
            await _userRepository.SaveChangesAsync();

            return Ok("User verified");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(userLoginDto.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!VerifyPasswordHash(userLoginDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            if (user.VerifiedAt == null)
            {
                return BadRequest("Not verified");
            }

            return Ok(user);
        }

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.PasswordResetToken = CreateToken(user);
            user.ResetTokenExpires = DateTime.Now.AddDays(1);

            Random random = new Random();
            int randomNumber = random.Next(100000, 1000000);
            user.OneTimeOTP = randomNumber;
            var Message = "Password Reset";

            CreateEmail(user.OneTimeOTP, email,Message);

            await _userRepository.SaveChangesAsync();

            return Ok("You may now reset your password");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userRepository.GetUserByPasswordResetTokenAsync(resetPasswordDto.Otp);
            if (user == null || user.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid token");
            }

            CreatePasswordHash(resetPasswordDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.PasswordResetToken = null;
            user.ResetTokenExpires = null;

            await _userRepository.SaveChangesAsync();

            return Ok("Password successfully reset");
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Firstname),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private void CreateEmail(int Otp, string recipientEmail,string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse("jabraar01@gmail.com"));
            emailMessage.To.Add(MailboxAddress.Parse(recipientEmail));
            emailMessage.Subject = $"{message}";

            string body = $"{message}. Your OTP is: {Otp}";
            emailMessage.Body = new TextPart(TextFormat.Html) { Text = body };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("jabraar01@gmail.com", "vcfg espi csts buzv");
            smtp.Send(emailMessage);
            smtp.Disconnect(true);
        }

    }
}
