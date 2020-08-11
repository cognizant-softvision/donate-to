using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.IdentityServer.Models;
using DonateTo.IdentityServer.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.IdentityServer.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IUserService _userService;
        private readonly IRepository<Role> _roleRepository;
        private readonly IMapper _mapper;

        public UserRoleService(IUserService userService,
                               IRepository<Role> roleRepository,
                               IMapper mapper)
        {
            _userService = userService;
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        /// <summary> 
        /// Gets a specific User with a list of all available roles. 
        /// The roles assigned to the user will be selected on the list for UI model purpose.
        /// </summary>
        /// <param name="id">Id of the User to retrieve</param>
        /// <returns>A list of clients</returns>
        public async Task<UserRoleViewModel> GetAsync(int idUser)
        {
            var user = await _userService.GetAsync(idUser).ConfigureAwait(false);
            var allRolesQuery = await _roleRepository.GetAsync(null).ConfigureAwait(false);
            var allRolesList = _mapper.Map<List<RoleModelView>>(allRolesQuery);
            var userRoleViewModel = new UserRoleViewModel
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Roles = AssignUserRoles(allRolesList, user.Roles)
            };
            return userRoleViewModel;
        }

        /// <summary>
        /// Updates the roles assigned for a specific user.
        /// </summary>
        /// <param name="userRoleViewModel"></param>
        /// <returns></returns>
        public async Task UpdateAsync(UserRoleViewModel userRoleViewModel)
        {
            IEnumerable<long> newRolesIds = userRoleViewModel.Roles.FindAll(r => r.Assigned == true).Select(r => r.Id);
            await _userService.UpdateUserRolesAsync(userRoleViewModel.Id, newRolesIds).ConfigureAwait(false);
        }

        /// <summary>
        /// Assign the user roles in the "all roles" list (for UI view model)
        /// </summary>
        /// <param name="allRolesList">Entire existing roles</param>
        /// <param name="userAssignedRoles">User assigned roles.</param>
        /// <returns></returns>
        private List<RoleModelView> AssignUserRoles(List<RoleModelView> allRolesList, IEnumerable<RoleModel> userAssignedRoles)
        {
            foreach (var role in allRolesList)
            {
                role.Assigned = userAssignedRoles.Any(uar => uar.Id == role.Id);
            }
            return allRolesList;
        }
    }
}
