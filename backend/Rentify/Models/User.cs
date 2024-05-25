using Org.BouncyCastle.Crypto.Utilities;

namespace Rentify.Models
{
    public class User
    {
        public Guid id { get; set; }

        public string Firstname { get; set; }

        public string? Lastname { get; set; }

        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public byte[] PasswordHash { get; set; } = new byte[32];

        public byte[] PasswordSalt { get; set; } = new byte[32];

        public String? VerificationToken { get; set; }

        public DateTime? VerifiedAt { get; set; }

        public string? PasswordResetToken { get; set; }

        public DateTime? ResetTokenExpires { get; set; }

        public int OneTimeOTP { get; set; }
    }
}
