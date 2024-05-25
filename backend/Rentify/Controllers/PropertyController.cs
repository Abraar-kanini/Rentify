using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit.Text;
using MimeKit;
using Rentify.Data;
using Rentify.DTO;
using Rentify.Models;
using Rentify.Repository;

namespace Rentify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly RentifyDbContext rentifyDbContext;
        private readonly IPropertyRepository _propertyRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PropertyController(RentifyDbContext rentifyDbContext, IPropertyRepository propertyRepository, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            this.rentifyDbContext = rentifyDbContext;
            _propertyRepository = propertyRepository;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public async Task<IActionResult> PostImage([FromForm] PropertyPostDto propertyPostDto)
        {
            ValidateFileUpload(propertyPostDto);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var property = new Property
                {
                    Title = propertyPostDto.Title,
                    Description = propertyPostDto.Description,
                    NumberOfBathrooms = propertyPostDto.NumberOfBathrooms,
                    NumberOfBedrooms = propertyPostDto.NumberOfBedrooms,
                    Address = propertyPostDto.Address,
                    IsNearHospital = propertyPostDto.IsNearHospital,
                    IsNearSchool = propertyPostDto.IsNearSchool,
                    RentPerMonth = propertyPostDto.RentPerMonth,
                    CarParking = propertyPostDto.CarParking,
                    UserId = propertyPostDto.UserId
                };

                if (propertyPostDto.File != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(propertyPostDto.File.FileName);
                    var fileExtension = Path.GetExtension(propertyPostDto.File.FileName);
                    var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", $"{fileName}{fileExtension}");

                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await propertyPostDto.File.CopyToAsync(stream);
                    }

                    var urlPath = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Images/{fileName}{fileExtension}";
                    property.FilePath = urlPath;
                    property.FileName = fileName;
                    property.FileExtenion = fileExtension;
                    property.FileSize = propertyPostDto.File.Length;
                }

                await _propertyRepository.AddAsync(property);

                return Ok(property);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public async Task<List<Property>> GetAllProperties()
        {
            return (await _propertyRepository.GetAllAsync()).ToList();
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<List<Property>>> GetParticularProperty([FromRoute] Guid id)
        {
            var properties = await _propertyRepository.GetByUserIdAsync(id);
            if (properties == null || !properties.Any())
            {
                return NotFound("Property not found");
            }
            return Ok(properties.ToList());
        }

        [HttpGet("PropertyId/{id:Guid}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            var property = await rentifyDbContext.properties.Include(a => a.user).FirstOrDefaultAsync(a => a.id == id);
            if (property == null)
            {
                return NotFound();
            }
            return Ok(property);
        }


        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> UpdatePropertyDetails([FromRoute] Guid id, [FromForm] PropertyPostDto propertyPostDto)
        {
            try
            {
                var property = await _propertyRepository.GetByIdAsync(id);
                if (property == null)
                {
                    ModelState.AddModelError("", "Property not found");
                    return BadRequest(ModelState);
                }

                ValidateFileUpload(propertyPostDto);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                property.Title = propertyPostDto.Title;
                property.Description = propertyPostDto.Description;
                property.NumberOfBathrooms = propertyPostDto.NumberOfBathrooms;
                property.NumberOfBedrooms = propertyPostDto.NumberOfBedrooms;
                property.Address = propertyPostDto.Address;
                property.IsNearHospital = propertyPostDto.IsNearHospital;
                property.IsNearSchool = propertyPostDto.IsNearSchool;
                property.RentPerMonth= propertyPostDto.RentPerMonth;

                if (propertyPostDto.File != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(propertyPostDto.File.FileName);
                    var fileExtension = Path.GetExtension(propertyPostDto.File.FileName);
                    var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", $"{fileName}{fileExtension}");

                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await propertyPostDto.File.CopyToAsync(stream);
                    }

                    var urlPath = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Images/{fileName}{fileExtension}";

                    property.FilePath = urlPath;
                    property.FileName = fileName;
                    property.FileExtenion = fileExtension;
                    property.FileSize = propertyPostDto.File.Length;
                }

                await _propertyRepository.UpdateAsync(property);

                return Ok(property);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("IM INTRESTED")]
        public async Task<IActionResult> SendMail([FromBody] PropertyDetailsDto propertyDetailsDto)
        {
            var PropertyId = await rentifyDbContext.properties.Include(a => a.user).FirstOrDefaultAsync(a => a.id == propertyDetailsDto.Property_Id);
            if (PropertyId == null)
            {
                return BadRequest("not found");
            }

            var UserId = await rentifyDbContext.users.FindAsync(propertyDetailsDto.User_Id);
            if (UserId == null)
            {
                return BadRequest("not found");
            }

            var UserEmail = UserId.Email;


            var PropertyPhoneNumber = PropertyId.user.PhoneNumber;
            CreateEmail(PropertyPhoneNumber, UserEmail);

            return Ok();




        }


        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            // Find the property by id
            var property = await rentifyDbContext.properties.FindAsync(id);

            // Check if the property exists
            if (property == null)
            {
                // If property not found, return BadRequest
                return BadRequest("Property not found");
            }

            try
            {
                // Remove the property from the DbContext
                rentifyDbContext.properties.Remove(property);

                // Save changes to the database
                await rentifyDbContext.SaveChangesAsync();

                // Return a success message
                return Ok("Property deleted successfully");
            }
            catch (Exception ex)
            {
                // If an error occurs during deletion, return a server error
                return StatusCode(500, "Internal server error");
            }
        }

        private void CreateEmail(string PhoneNumber ,string recipientEmail)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse("jabraar01@gmail.com"));
            emailMessage.To.Add(MailboxAddress.Parse(recipientEmail));
            emailMessage.Subject = "Thanks For Intrested In Our Property";

            string body = $" Property Owner PhoneNumber is: {PhoneNumber}";
            emailMessage.Body = new TextPart(TextFormat.Html) { Text = body };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("jabraar01@gmail.com", "vcfg espi csts buzv");
            smtp.Send(emailMessage);
            smtp.Disconnect(true);
        }

        private void ValidateFileUpload(PropertyPostDto propertyPostDto)
        {
            if (propertyPostDto.File != null)
            {
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var fileExtension = Path.GetExtension(propertyPostDto.File.FileName).ToLower();

                if (!allowedExtensions.Contains(fileExtension))
                {
                    ModelState.AddModelError("file", "Unsupported file extension");
                }

                if (propertyPostDto.File.Length > 10485760)
                {
                    ModelState.AddModelError("file", "File size is greater than 10 MB");
                }
            }
        }
    }
}
