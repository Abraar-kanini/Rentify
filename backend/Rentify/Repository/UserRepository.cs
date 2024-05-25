using Microsoft.EntityFrameworkCore;
using Rentify.Data;
using Rentify.Models;

namespace Rentify.Repository
{
    public class UserRepository:IUserRepository
    {
        private readonly RentifyDbContext _context;

        public UserRepository(RentifyDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByVerificationTokenAsync(int Otp)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.OneTimeOTP == Otp);
        }

        public async Task<User> GetUserByPasswordResetTokenAsync(int Otp)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.OneTimeOTP == Otp);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.users.AddAsync(user);
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.users.AnyAsync(u => u.Email == email);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
