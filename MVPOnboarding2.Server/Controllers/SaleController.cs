using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
	public class SaleController : ControllerBase
	{
		private readonly OnboardingTaskContext _context;

		public SaleController(OnboardingTaskContext context)
		{
			_context = context;
		}

		// GET: api/Sale
		[HttpGet]
		public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
		{
			try
			{
				var sales = await _context.Sales
				  .Include(p => p.Product)
				  .Include(c => c.Customer)
				  .Include(s => s.Store)
				  .Select(x => SaleMapper.EntityToDto(x)).ToListAsync();
				if (sales.Count == 0)
				{
					return NoContent();
				}
				return Ok(sales);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
		// GET: api/Sale/1/10
		[HttpGet("{pagenumber}/{pagesize}")]
		public async Task<ActionResult<IEnumerable<SaleDto>>> GetSalesWithPagination(int pagenumber = 1, int pagesize = 10)
		{
			try
			{
				var sales = await _context.Sales
				   .Include(p => p.Product)
				   .Include(c => c.Customer)
				   .Include(s => s.Store)
				   .Select(x => SaleMapper.EntityToDto(x)).ToListAsync();
				if (sales.Count == 0)
				{
					return NoContent();
				}
				IPagedList<SaleDto> pagedList = sales.ToPagedList(pagenumber, pagesize);
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

		// GET: api/Sale/5
		[HttpGet("{id}")]
		public async Task<ActionResult<SaleDto>> GetSale(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!SaleExists(id)) return NotFound("No sale found.");
			
			try
			{
				var sale = await _context.Sales
					 .Include(p => p.Product)
					 .Include(c => c.Customer)
					 .Include(s => s.Store)
					 .FirstOrDefaultAsync(x => x.Id == id);
				if (sale == null)
				{
					return NotFound();
				}
				return SaleMapper.EntityToDto(sale);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// PUT: api/Sale/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSale(int id, SaleDto sale)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!SaleExists(id)) return NotFound("No sale found.");
			if (id != sale.Id) return BadRequest();
			
			var entity = SaleMapper.DtoToEntity(sale);
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

		// POST: api/Sale
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<SaleDto>> PostSale(SaleDto sale)
		{
			try
			{
				var entity = SaleMapper.DtoToEntity(sale);
				_context.Sales.Add(entity);
				await _context.SaveChangesAsync();
				var saleDetails = await _context.Sales
					.Include(p => p.Product)
					.Include(c => c.Customer)
					.Include(s => s.Store)
					.SingleAsync(x => x.Id == entity.Id);
				return CreatedAtAction("GetSale", new { id = sale.Id }, SaleMapper.EntityToDto(saleDetails));
			}
			catch (DbUpdateException)
			{
				return BadRequest("Error occured. Sale record not created.");
			}
		}

		// DELETE: api/Sale/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSale(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!SaleExists(id)) return NotFound("No sale found.");
			
			var sale = await _context.Sales.FindAsync(id);
			if (sale == null)
			{
				return NotFound();
			}
			_context.Sales.Remove(sale);
			
			try
			{
				await _context.SaveChangesAsync();
				return NoContent();
			}
			catch (DbUpdateException)
			{
				return BadRequest("Cannot be deleted. Possible record exist in sale table");
			}
		}

		private bool SaleExists(int id)
		{
			return _context.Sales.Any(e => e.Id == id);
		}
	}
}
