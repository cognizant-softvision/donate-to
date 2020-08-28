using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IAddressService: IBaseService<Address, BaseFilterModel>
    {
        /// <summary>
        /// Soft deletes an Address
        /// </summary>
        /// <param name="address">Address</param>
        /// <returns></returns>
        Task SoftDelete(Address address);
    }
}
