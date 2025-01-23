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
	public class ProductController : ControllerBase
	{
		private readonly OnboardingTaskContext _context;

		public ProductController(OnboardingTaskContext context)
		{
			_context = context;
		}

		// GET: api/Product
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
		{
			try
			{
				var products = await _context.Products.Select(p => ProductMapper.EntityToDto(p)).ToListAsync();
				if (products.Count == 0)
				{
					return NoContent();
				}
				return Ok(products);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// GET: api/Product/1/10
		[HttpGet("{pagenumber}/{pagesize}")]
		public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsWithPagination(int pagenumber = 1, int pagesize = 10)
		{
			try
			{
				var products = await _context.Products.Select(p => ProductMapper.EntityToDto(p)).ToListAsync();
				if (products.Count == 0)
				{
					return NoContent();
				}
				IPagedList<ProductDto> pagedList = products.ToPagedList(pagenumber, pagesize);
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

		// GET: api/Product/5
		[HttpGet("{id}")]
		public async Task<ActionResult<ProductDto>> GetProduct(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid");
			if (!ProductExists(id)) return NotFound("No product found.");

			try
			{
				var product = await _context.Products.FindAsync(id);
				if (product == null)
				{
					return NotFound();
				}
				return ProductMapper.EntityToDto(product);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// PUT: api/Product/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutProduct(int id, ProductDto product)
		{
			if (id <= 0) return BadRequest("Id is not valid");
			if (!ProductExists(id)) return NotFound("No product found.");
			if (id != product.Id) return BadRequest();

			var entity = ProductMapper.DtoToEntity(product);
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

		// POST: api/Product
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<ProductDto>> PostProduct(ProductDto product)
		{
			try
			{
				var entity = ProductMapper.DtoToEntity(product);
				_context.Products.Add(entity);
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetProduct", new { id = entity.Id }, ProductMapper.EntityToDto(entity));
			}
			catch (DbUpdateException)
			{
				return BadRequest("Error occured. Product record not created.");
			}
		}

		// DELETE: api/Product/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteProduct(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid");
			if (!ProductExists(id)) return NotFound("No product found");
			
			var product = await _context.Products.FindAsync(id);
			if (product == null)
			{
				return NotFound();
			}
			_context.Products.Remove(product);

			try
			{
				await _context.SaveChangesAsync();
				return NoContent();
			}
			catch (DbUpdateException)
			{
				return BadRequest("Cannot be deleted. Possible record exist in product table.");
			}
		}

		private bool ProductExists(int id)
		{
			return _context.Products.Any(e => e.Id == id);
		}
	}
}
