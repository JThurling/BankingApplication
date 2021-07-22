using System;
using AutoMapper;
using Core.BankAccount;
using Core.DTO;

namespace BankApplication.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BankAccountDto, BankAccount>()
                .ForMember(m => m.AccountType, o =>
                    o.MapFrom(f => Enum.Parse<AccountType>(nameof(AccountType))));
        }
    }
}
