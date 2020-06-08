using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DonateTo.IdentityServer.Models;
using DonateTo.IdentityServer.Services;
using IdentityServer4.EntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.IdentityServer.Controllers
{
    [Authorize(Roles = "Superadmin")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;
        private readonly IMapper _mapper;

        public ClientController(
            IClientService clientService,
            IMapper mapper)
        {
            _mapper = mapper;
            _clientService = clientService;
        }


        [HttpGet]
        public IActionResult New()
        {
            var newClient = new ClientRegistrationViewModel();
            return View("Edit", newClient);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ClientRegistrationViewModel clientRegistrationViewModel)
        {

            if (!ModelState.IsValid)
            {
                return View("Edit", clientRegistrationViewModel);
            }

            var client = _mapper.Map<Client>(clientRegistrationViewModel);
            client.Updated = DateTime.UtcNow;
            client.Created = DateTime.UtcNow;
            await _clientService.CreateAsync(client).ConfigureAwait(false);

            return RedirectToAction("List");
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var result = await _clientService.GetAsync(id).ConfigureAwait(false);
            var client = _mapper.Map<Client, ClientRegistrationViewModel>(result);

            return View("Edit", client);
        }


        [HttpPost]
        public IActionResult RefreshList(NavigationListViewModel listModel)
        {
            return PartialView("_NavigationList", listModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(ClientRegistrationViewModel clientRegistrationViewModel, int id)
        {
            if (!ModelState.IsValid)
            {
                return View("Edit", clientRegistrationViewModel);
            }

            var client = _mapper.Map<ClientRegistrationViewModel, Client>(clientRegistrationViewModel);
            client.Updated = DateTime.UtcNow;
            await _clientService.UpdateAsync(client, id).ConfigureAwait(false);

            return RedirectToAction("List");
        }



        [HttpGet]
        public async Task<IActionResult> List()
        {
            var clients = await _clientService.GetAsync(_ => true).ConfigureAwait(false);
            var clientItems = _mapper.Map<List<ClientListItem>>(clients);
            return View("List", clientItems);
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            await _clientService.DeleteAsync(id).ConfigureAwait(false);

            return RedirectToAction("List");
        }




    }
}
