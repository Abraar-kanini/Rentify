using System.ComponentModel.DataAnnotations.Schema;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace Rentify.Models
{
    public class Property
    {
        public Guid id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }
        public string Address { get; set; }
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public bool IsNearSchool { get; set; }
        public bool IsNearHospital { get; set; }

        public long RentPerMonth { get; set; }

        public int CarParking { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

        public string? FileName { get; set; }

        public string? FileDescription { get; set; }

        public string FileExtenion { get; set; }
        public long FileSize { get; set; }

        public string FilePath { get; set; }

        //navigational property

        public Guid UserId { get; set; }

        public User user { get; set; }
    }
}
