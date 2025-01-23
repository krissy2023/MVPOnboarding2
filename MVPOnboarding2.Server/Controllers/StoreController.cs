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
	public class StoreController : ControllerBase
	{
		private readonly OnboardingTaskContext _context;

		public StoreController(OnboardingTaskContext context)
		{
			_context = context;
		}

		// GET: api/Store
		[HttpGet]
		public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
		{
			try
			{
				var stores = await _context.Stores.Select(s => StoreMapper.EntityToDto(s)).ToListAsync();
				if (stores.Count == 0)
				{
					return NoContent();
				}
				return Ok(stores);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// GET: api/Store/1/10
		[HttpGet("{pagenumber}/{pagesize}")]
		public async Task<ActionResult<IEnumerable<StoreDto>>> GetStoresWithPagination(int pagenumber = 1, int pagesize = 10)
		{
			try
			{
				var stores = await _context.Stores.Select(s => StoreMapper.EntityToDto(s)).ToListAsync();
				if (stores.Count == 0)
				{
					return NoContent();
				}
				IPagedList<StoreDto> pagedList = stores.ToPagedList(pagenumber, pagesize);
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

		// GET: api/Store/5
		[HttpGet("{id}")]
		public async Task<ActionResult<StoreDto>> GetStore(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!StoreExists(id)) return NotFound("No store found.");
			
			try
			{
				var store = await _context.Stores.FindAsync(id);
				if (store == null)
				{
					return NotFound();
				}
				return StoreMapper.EntityToDto(store);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// PUT: api/Store/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutStore(int id, StoreDto store)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!StoreExists(id)) return NotFound("No store found.");
			if (id != store.Id) return BadRequest();
			
			var entity = StoreMapper.DtoToEntity(store);
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

		// POST: api/Store
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<StoreDto>> PostStore(StoreDto store)
		{
			try
			{
				var entity = StoreMapper.DtoToEntity(store);
				_context.Stores.Add(entity);
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetStore", new { id = entity.Id }, StoreMapper.EntityToDto(entity));
			}
			catch (DbUpdateException)
			{
				return BadRequest("Error occured. Store record not created.");
			}
		}

		// DELETE: api/Store/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteStore(int id)
		{
			if (id <= 0) return BadRequest("Id is not valid.");
			if (!StoreExists(id)) return NotFound("No store found.");
			
			var store = await _context.Stores.FindAsync(id);
			if (store == null)
			{
				return NotFound();
			}
			_context.Stores.Remove(store);
			
			try
			{
				await _context.SaveChangesAsync();
				return NoContent();
			}
			catch (DbUpdateException)
			{
				return BadRequest("Cannot be deleted. Possible record exist in store table");
			}
		}

		private bool StoreExists(int id)
		{
			return _context.Stores.Any(e => e.Id == id);
		}
	}
}
