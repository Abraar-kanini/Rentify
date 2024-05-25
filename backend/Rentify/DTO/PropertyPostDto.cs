namespace Rentify.DTO
{
    public class PropertyPostDto
    {
        public string Title { get; set; }

        public string Description { get; set; }
        public string Address { get; set; }
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public bool IsNearSchool { get; set; }
        public bool IsNearHospital { get; set; }
        public long RentPerMonth { get; set; }

        public int CarParking { get; set; }

        public IFormFile File { get; set; }

        public string FileName { get; set; }

        public string? FileDescription { get; set; }

        public Guid UserId { get; set; }
    }
}
