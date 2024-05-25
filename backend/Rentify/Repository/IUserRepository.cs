using Rentify.Models;

namespace Rentify.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByVerificationTokenAsync(int Otp);
        Task<User> GetUserByPasswordResetTokenAsync(int Otp);
        Task AddUserAsync(User user);
        Task<bool> UserExistsAsync(string email);
        Task SaveChangesAsync();
    }
}
