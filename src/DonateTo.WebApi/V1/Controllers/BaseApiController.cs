﻿using System.Collections.Generic;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiController]
    public abstract class BaseApiController<T> : ControllerBase where T : class
    {
        private IBaseService<T> _serviceProvider  { get; set; }

        public BaseApiController(IBaseService<T> baseService)
        {
            _serviceProvider = baseService;
        }

        /// <summary>
        /// Use the method to request a resource from the server.
        /// </summary>
        /// <returns>Status 200 if the request has succeeded or
        ///  Status 500 if that have an error</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual ActionResult<IEnumerable<T>> Get()
        {
            var result = _serviceProvider.GetAsync();

            return Ok(result);
        }

        /// <summary>
        /// Use the method to request a resource from the server.
        /// </summary>
        /// <param name="id">ID of the resource to be search.</param>
        /// <returns>Status 200 if the request has succeeded,
        /// Status 404 if not found the request or
        /// Status 500 if that have an error</returns>
        [HttpGet("{id}", Name = "Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual ActionResult<IEnumerable<T>> Get(long id)
        {
            var result = _serviceProvider.GetAsync(id);

            return Ok(result);
        }

        /// <summary>
        /// Use the method to send a resource to the server.
        /// </summary>
        /// <param name="value">Value to be send.</param>
        /// <returns>Status 201 if the request has created,
        /// Status 400 if the request doesnt be created or
        /// Status 500 if that have an error</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual IActionResult Post([FromBody] T value)
        {
            var result = _serviceProvider.CreateAsync(value);

            return Ok(result);
        }

        /// <summary>
        /// Use the method to update an existing resource on the server.
        /// </summary>
        /// <param name="id">ID of the resource to be update.</param>
        /// <param name="value">New value of the resource.</param>
        /// <returns>Status 200 if the request has succeeded or
        ///  Status 500 if that have an error</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual IActionResult Put(long id, [FromBody] T value)
        {
            var result = _serviceProvider.UpdateAsync(value, id);

            return Ok(result);
        }

        /// <summary>
        /// Use the method to  delete a resource from the server.
        /// </summary>
        /// <param name="id">ID of the resource to be delete</param>
        /// <returns>Status 200 if the request has succeeded,
        /// Status 404 if not found the request or
        /// Status 500 if that have an error</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public virtual IActionResult Delete(long id)
        {
            var result = _serviceProvider.DeleteAsync(id);

            return Ok(result);
        }
    }
}
