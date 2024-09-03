using Microsoft.EntityFrameworkCore;
using stockz_bucketz_api.Models;

namespace stockz_bucketz_api.Context
{
    public class AppDbContext:DbContext
    {
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<SaveStocks> SavesStocks { get; set; }
        public DbSet<StockBrapi> StocksBrapi { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
