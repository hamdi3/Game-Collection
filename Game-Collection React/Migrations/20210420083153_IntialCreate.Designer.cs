﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using React_Project_1.Models;

namespace React_Project_1.Migrations
{
    [DbContext(typeof(GameListDBContext))]
    [Migration("20210420083153_IntialCreate")]
    partial class IntialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication1.Models.Game", b =>
                {
                    b.Property<int>("G_Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("G_Genre")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("G_Plattform")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("G_Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("G_ReleaseDate");

                    b.Property<string>("G_Title")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("G_Id");

                    b.ToTable("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
