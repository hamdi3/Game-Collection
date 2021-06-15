﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using TestProjekt.Models;

namespace TestProjekt.Migrations
{
    [DbContext(typeof(TestProjektContext))]
    [Migration("20210408130610_GameList")]
    partial class GameList
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TestProjekt.Models.GameList", b =>
                {
                    b.Property<int>("GL_ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("GL_Genre");

                    b.Property<string>("GL_Plattform");

                    b.Property<decimal>("GL_Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("GL_ReleaseDate");

                    b.Property<string>("GL_Title");

                    b.HasKey("GL_ID");

                    b.ToTable("GameList");
                });

            modelBuilder.Entity("TestProjekt.Models.Users", b =>
                {
                    b.Property<int>("USR_ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("USR_FirstName");

                    b.Property<string>("USR_LastName");

                    b.Property<string>("USR_Password");

                    b.Property<string>("USR_UserName");

                    b.HasKey("USR_ID");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}