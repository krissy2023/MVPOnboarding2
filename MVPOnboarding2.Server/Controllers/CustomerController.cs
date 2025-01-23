using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using MVPOnboarding2.Server.DTOs;
using MVPOnboarding2.Server.Mappers;
using MVPOnboarding2.Server.Models;
using X.PagedList;
using X.PagedList.Extensions;

namespace MVPOnboarding2.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CustomerController : ControllerBase
	{
		private readonly OnboardingTaskContext _context;

		public CustomerController(OnboardingTaskContext context)
		{
			_context = context;
		}
		// GET: api/Customer
		[HttpGet]
		public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
		{
			try
			{
				var customers = await _context.Customers.Select(c => CustomerMapper.EntityToDto(c)).ToListAsync();
				if (customers.Count == 0)
				{
					return NoContent();
				}
				return Ok(customers);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// GET: api/Customer/1/10

		[HttpGet("{pagenumber}/{pagesize}")]
		public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomersWithPagination(int pagenumber = 1, int pagesize = 10)
		{
			try
			{
				var customers = await _context.Customers.Select(c => CustomerMapper.EntityToDto(c)).ToListAsync();
				if (customers.Count == 0)
				{
					return NoContent();
				}
				IPagedList<CustomerDto> pagedList = customers.ToPagedList(pagenumber, pagesize);
				return Ok(new { pagedList, pagedList.TotalItemCount });
			}
			catch (ArgumentOutOfRangeException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// GET: api/Customer/5
		[HttpGet("{id}")]
		public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!CustomerExists(id)) return NotFound("No customer found.");
			
			try
			{
				var customer = await _context.Customers.FindAsync(id);
				if (customer == null)
				{
					return NotFound();
				}
				return CustomerMapper.EntityToDto(customer);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// PUT: api/Customer/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCustomer(int id, CustomerDto customer)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!CustomerExists(id)) return NotFound("No customer found.");
			if (id != customer.Id) return BadRequest();
			
			var entity = CustomerMapper.DtoToEntity(customer);
			_context.Entry(entity).State = EntityState.Modified;
			
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				return BadRequest("Error occured. Update not saved.");
			}
			return NoContent();
		}

		// POST: api/Customer
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<CustomerDto>> PostCustomer(CustomerDto customer)
		{
			try
			{
				var entity = CustomerMapper.DtoToEntity(customer);
				_context.Customers.Add(entity);
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetCustomer", new { id = entity.Id }, CustomerMapper.EntityToDto(entity));
			}
			catch (DbUpdateException)
			{
				return BadRequest("Error occured. Customer record not created.");
			}
		}

		// DELETE: api/Customer/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCustomer(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!CustomerExists(id)) return NotFound("No customer found.");
			
			var customer = await _context.Customers.FindAsync(id);
			if (customer == null)
			{
				return NotFound();
			}
			_context.Customers.Remove(customer);
			
			try
			{
				await _context.SaveChangesAsync();
				return NoContent();
			}
			catch (DbUpdateException)
			{
				return BadRequest("Cannot be deleted. Possible record exist in customer table");
			}
		}
		private bool CustomerExists(int id)
		{
			return _context.Customers.Any(e => e.Id == id);
		}
	}
}
