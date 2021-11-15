using AutoMapper;
using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Hubs;
using DotNetChatReactApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext _context;
        private readonly User _user;
       // private readonly IUserService _userService;
        private readonly IMessageService _messageService;

        private readonly IHubContext<ChatHub, IChatHub> _hubContext;


        public MessageService(DataContext context, IHttpContextAccessor httpContextAccessor )
        {
          
            _context = context;
            //_user = _context.Users
            //    .First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
        }



        public async Task<List<Message>> GetAllMessagesByUserId(int userId)

        {
            var messages = await _context.Messages.Where(c => c.UserId == userId).ToListAsync();

            return messages;
        }


        public async Task<List<Message>> GetAllMessages()

        {
            var messages = await _context.Messages.ToListAsync();

            return messages;
        }

    }   
}
