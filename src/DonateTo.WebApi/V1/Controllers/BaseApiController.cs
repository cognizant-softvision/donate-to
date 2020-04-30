﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiController]
    public abstract class BaseApiController<T> : ControllerBase where T : class
    {
        /// <summary>
        /// Use the method to request a resource from the server.
        /// </summary>
        /// <returns>Status 200 if the request has succeeded or
        ///  Status 500 if that have an error</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public abstract ActionResult<IEnumerable<T>> Get();

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
        public abstract ActionResult<IEnumerable<T>> Get(long id);

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
        public abstract IActionResult Post([FromBody] string value);

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
        public abstract IActionResult Put(long id, [FromBody] string value);

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
        public abstract IActionResult Delete(long id);
    }
}
