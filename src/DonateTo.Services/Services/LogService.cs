using AutoMapper;
using AutoMapper.Extensions.ExpressionMapping;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.ApplicationCore.Common;
using DonateTo.Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Models.Filtering;
using LinqKit;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace DonateTo.Services
{
    public class LogService : ILogService
    {
        private readonly IRepository<Log> _logRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LogService(
            IRepository<Log> logRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _logRepository = logRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        ///<inheritdoc cref="ILogService"/>
        public Log FirstOrDefault(Expression<Func<Log, bool>> filter)
        {
            return _logRepository.FirstOrDefault(filter);
        }

        ///<inheritdoc cref="ILogService"/>
        public async Task<Log> FirstOrDefaultAsync(Expression<Func<Log, bool>> filter)
        {
            return await _logRepository.FirstOrDefaultAsync(filter).ConfigureAwait(false);
        }
               
        

        ///<inheritdoc cref="ILogService"/>
        public IEnumerable<Log> Get(Expression<Func<Log, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<Log, bool>>>(filter);
            return _logRepository.Get(filterDest);
        }

        ///<inheritdoc cref="ILogService"/>
        public async Task<IEnumerable<Log>> GetAsync(Expression<Func<Log, bool>> filter)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<Log, bool>>>(filter);
            return await _logRepository.GetAsync(filterDest).ConfigureAwait(false);
        }

        ///<inheritdoc cref="ILogService"/>
        public Log Get(long id)
        {
            return _logRepository.Get(id);
        }

        ///<inheritdoc cref="ILogService"/>
        public async Task<Log> GetAsync(long id)
        {
            return await _logRepository.GetAsync(id).ConfigureAwait(false);
        }

        ///<inheritdoc cref="ILogService"/>
        public PagedResult<Log> GetPaged(int page, int pageSize, Expression<Func<Log, bool>> filter = null)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<Log, bool>>>(filter);
            return _logRepository.GetPaged(page, pageSize, filterDest);
        }

        ///<inheritdoc cref="ILogService"/>
        public async Task<PagedResult<Log>> GetPagedAsync(int page, int pageSize, Expression<Func<Log, bool>> filter = null)
        {
            var filterDest = _mapper.MapExpression<Expression<Func<Log, bool>>>(filter);
            return await _logRepository.GetPagedAsync(page, pageSize, filterDest).ConfigureAwait(false);
        }
           
        ///<inheritdoc cref="ILogService"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        public PagedResult<Log> GetPagedFiltered(LogFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _logRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="ILogService"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        public async Task<PagedResult<Log>> GetPagedFilteredAsync(LogFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return await _logRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        #region private


        /// <summary>
        /// Returns sort string from filter model
        /// Default is: timestamp descending
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Normalize strings to uppercase", Justification = "<Pending>")]
        private string GetSort(LogFilterModel filter)
        {
            var properties = typeof(LogFilterModel).GetProperties();

            var sort = !string.IsNullOrEmpty(filter.OrderBy)
                && properties.Any(p => p.Name.ToUpperInvariant() == filter.OrderBy.ToUpperInvariant()
                && p.GetCustomAttributes(typeof(NotMappedAttribute), true).Length > 1) ?
                $"{ char.ToUpperInvariant(filter.OrderBy[0]) + filter.OrderBy.Substring(1).ToLowerInvariant() } " :
                "timestamp ";

            sort += !string.IsNullOrEmpty(filter.OrderDirection)
                && (filter.OrderDirection == SortDirection.Ascending || filter.OrderDirection == "ascending") ?
                SortDirection.Ascending :
                SortDirection.Descending;

            return sort;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        private Expression<Func<Log, bool>> GetPredicate(LogFilterModel filter)
        {
            var predicate = PredicateBuilder.New<Log>(true);


            if (!string.IsNullOrEmpty(filter.TimeStampBegin))
            {
                if (DateTime.TryParse(filter.TimeStampBegin, out var outDate))
                {
                    predicate = predicate.And(p => p.TimeStamp >= outDate);
                }
            }

            if (!string.IsNullOrEmpty(filter.TimeStampEnd))
            {
                if (DateTime.TryParse(filter.TimeStampEnd, out var outDate))
                {
                    predicate = predicate.And(p => p.TimeStamp < outDate.AddDays(1));
                }
            }


            if (!string.IsNullOrEmpty(filter.Message))
            {
                predicate = predicate.And(p =>
                                EF.Functions.ILike(p.Message, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.Message)));
            }


            //Not Working for PostgreSQL jsonb fields (If needed it must be researched)
            //if (!string.IsNullOrEmpty(filter.LogEvent))
            //{
            //    predicate = predicate.And(p =>
            //                     EF.Functions.ILike(p.LogEvent, string.Format(CultureInfo.CurrentCulture, "%{0}%", filter.LogEvent)));
            //}

            return predicate;
        }
        #endregion
    }
}