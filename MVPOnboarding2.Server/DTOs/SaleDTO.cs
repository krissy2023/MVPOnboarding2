using MVPOnboarding2.Server.Models;

namespace MVPOnboarding2.Server.DTOs
{
    public class SaleDTO
    {
        public int Id { get; set; }

        public int? ProductId { get; set; }

        public int? CustomerId { get; set; }

        public int? StoreId { get; set; }

        public DateTime? DateSold { get; set; }

        public virtual Customer? Customer { get; set; }

        public virtual Product? Product { get; set; }

        public virtual Store? Store { get; set; }
    }
}
