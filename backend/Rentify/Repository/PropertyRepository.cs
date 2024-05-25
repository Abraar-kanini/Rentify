using Microsoft.EntityFrameworkCore;
using Rentify.Data;
using Rentify.Models;

namespace Rentify.Repository
{
    public class PropertyRepository:IPropertyRepository
    {
        private readonly RentifyDbContext _context;

        public PropertyRepository(RentifyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Property>> GetAllAsync()
        {
            return await _context.properties.Include(p => p.user).ToListAsync();
        }

        public async Task<Property> GetByIdAsync(Guid id)
        {
            return await _context.properties.Include(p => p.user).FirstOrDefaultAsync(p => p.id == id);
        }

        public async Task<IEnumerable<Property>> GetByUserIdAsync(Guid userId)
        {
            return await _context.properties
                                 .Include(p => p.user)
                                 .Where(p => p.user.id == userId)
                                 .ToListAsync();
        }

        public async Task AddAsync(Property property)
        {
            await _context.properties.AddAsync(property);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Property property)
        {
            _context.properties.Update(property);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.properties.AnyAsync(p => p.id == id);
        }
    }

}

