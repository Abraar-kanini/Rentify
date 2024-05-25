using Rentify.Models;

namespace Rentify.Repository
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetAllAsync();
        Task<Property> GetByIdAsync(Guid id);
        Task<IEnumerable<Property>> GetByUserIdAsync(Guid userId);
        Task AddAsync(Property property);
        Task UpdateAsync(Property property);
        Task<bool> ExistsAsync(Guid id);
    }
}
