using Confitec.Infrastructure.Configurations.Contexts;
using Confitec.Infrastructure.Interfaces;
using System;
using System.Threading.Tasks;

namespace Confitec.Infrastructure.Repositories
{
    public class GenericPersist : IGenericPersist
    {
        private readonly ConfitecContext _context;

        public GenericPersist(ConfitecContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void Add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

    }
}
