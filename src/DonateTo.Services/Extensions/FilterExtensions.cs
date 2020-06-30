using DonateTo.ApplicationCore.Common;
using DonateTo.ApplicationCore.Models;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace DonateTo.Services.Extensions
{
    public static class FilterExtensions
    {
        public static Expression<Func<T, bool>> FilterQuery<T>(this FilterModel filter) where T: class
        {
            var parameter = Expression.Parameter(typeof(T), "t");
            var member = Expression.Property(parameter, filter.Property);
            var constant = Expression.Constant(filter.SearchValue);

            BinaryExpression body = null;

            switch (filter.Condition)
            {
                case FilterConditions.Equal:
                    body = Expression.Equal(member, constant);
                    return Expression.Lambda<Func<T, bool>>(body, parameter);
                case FilterConditions.GreaterThan:
                    body = Expression.GreaterThan(member, constant);
                    return Expression.Lambda<Func<T, bool>>(body, parameter);
                case FilterConditions.GreaterThanOrEqual:
                    body = Expression.GreaterThanOrEqual(member, constant);
                    return Expression.Lambda<Func<T, bool>>(body, parameter);
                case FilterConditions.LessThan:
                    body = Expression.LessThan(member, constant);
                    return Expression.Lambda<Func<T, bool>>(body, parameter);
                case FilterConditions.LessThanOrEqual:
                    body = Expression.LessThanOrEqual(member, constant);
                    return Expression.Lambda<Func<T, bool>>(body, parameter);
                case FilterConditions.Like:
                    MethodInfo method = typeof(string).GetMethod("Contains");
                    var call = Expression.Call(member, method, constant);
                    return Expression.Lambda<Func<T, bool>>(call, parameter);

                default:
                    throw new Exception("Not implemented operation.");
            }
        }
    }
}
