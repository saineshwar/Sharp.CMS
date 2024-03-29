using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DNTCaptcha.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Sharp.CMS.Common;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.RenderingPages.Queries;
using Sharp.CMS.Extensions;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddServicesCommand(Configuration);
            services.AddServicesQueries(Configuration);

            var connection = Configuration.GetConnectionString("DatabaseConnection");
            services.AddDbContext<SharpContext>(options => options.UseSqlServer(connection));
            services.Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddControllersWithViews();
            services.AddTransient<IRenderingMenus, RenderingMenus>();
            services.AddAutoMapper(typeof(Startup).Assembly);


            #region Elmah

            //services.AddElmah<SqlErrorLog>(options =>
            //{
            //    options.ConnectionString = Configuration.GetValue<string>("ConnectionStrings:DatabaseConnection");
            //});
            //services.AddElmah(options => options.Path = "/elmahxbug"); 

            #endregion

            // For FileUpload
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
                x.ValueLengthLimit = int.MaxValue; //not recommended value
                x.MemoryBufferThreshold = Int32.MaxValue;
            });

            // For Setting Session Timeout
            services.AddSession(options =>
            {
                options.Cookie.Name = ".Sharp.Session";
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
                //options.Cookie.SameSite = SameSiteMode.None;

            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest)
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver =
                        new Newtonsoft.Json.Serialization.DefaultContractResolver();
                })
                .AddSessionStateTempDataProvider();


            //  Cookie
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
                options.Secure = CookieSecurePolicy.Always;
                options.CheckConsentNeeded = context => true; // consent required
                options.MinimumSameSitePolicy = SameSiteMode.None;
                options.ConsentCookie.IsEssential = true;
                options.OnAppendCookie = (context) =>
                {
                    context.IssueCookie = true;
                };
            });


            services.AddControllersWithViews(options => { }).AddRazorRuntimeCompilation();

            // using Memory Cache 
            services.AddMemoryCache();

            #region Registering AddDNTCaptcha

            //  AddDNTCaptcha
            services.AddDNTCaptcha(options =>

                options.UseCookieStorageProvider()
                    .ShowThousandsSeparators(false)
                    .WithEncryptionKey("9F3baE2KFTM7m0C^tt%^Ag")

            );
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            app.UseStaticFiles();

            //app.Use(async (context, next) =>
            //{
            //    string path = context.Request.Path;

            //    if (path.EndsWith(".css") || path.EndsWith(".js"))
            //    {

            //        //Set css and js files to be cached for 7 days
            //        TimeSpan maxAge = new TimeSpan(7, 0, 0, 0);     //7 days
            //        context.Response.Headers.Append("Cache-Control", "max-age=" + maxAge.TotalSeconds.ToString("0"));

            //    }
            //    else if (path.EndsWith(".gif") || path.EndsWith(".jpg") || path.EndsWith(".png"))
            //    {
            //        //custom headers for images goes here if needed

            //    }
            //    else
            //    {
            //        //Request for views fall here.
            //        context.Response.Headers.Append("Cache-Control", "no-cache");
            //        context.Response.Headers.Append("Cache-Control", "private, no-store");

            //    }
            //    await next();
            //});

            app.UseRouting();

            app.UseAuthorization();

            //app.UseElmah();
            app.UseCookiePolicy();
            // Enabling Session
            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("areas", "{area:exists}/{controller=Home}/{action=Index}/{id?}");


                endpoints.MapControllerRoute("DatabasePage",
                    "{PageName}",
                    new
                    {
                        controller = "Home",
                        action = "Index",
                        PageName = ""
                    });

                
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

              
            });
        }
    }
}
