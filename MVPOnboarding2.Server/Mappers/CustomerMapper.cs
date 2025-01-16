using MVPOnboarding2.Server.DTOs;
using MVPOnboarding2.Server.Models;

namespace MVPOnboarding2.Server.Mappers
{
    
    public static class CustomerMapper
    {
        public static Customer DtoToEntity(CustomerDto customerDto)
        {
            var entity = new Customer
            {
                Id = customerDto.Id,
                Name = customerDto.Name,
                Address = customerDto.Address,
            };

            return entity;
        }

        public static CustomerDto EntityToDto(Customer customer)
        {
            var dto = new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
               
            };

            return dto;
        }
    }
}
