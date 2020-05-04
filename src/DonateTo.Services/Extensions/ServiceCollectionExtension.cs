<<<<<<< HEAD
﻿using DonateTo.ApplicationCore.Interfaces.Services;
=======
﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
>>>>>>> dccc6f2... Create base controller for the web api (#36)
using DonateTo.Infrastructure.Extensions;
using DonateTo.Services.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DonateTo.Services.Extensions
{
    public static class ServiceCollectionExtension
    {
        /// <summary>
        /// Add all the DonateTo's dependencies to the collection.
        /// </summary>
        /// <param name="service">IServiceCollection.</param>
        /// <param name="configuration">IConfiguration.</param>
        public static void AddDonateToModule(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddEntityFramework(configuration);
<<<<<<< HEAD

            service.AddScoped<IUserService, UserService>();
=======
            service.AddScoped<IBaseService<SampleModel>, SampleService>();
>>>>>>> dccc6f2... Create base controller for the web api (#36)
        }
    }
}
