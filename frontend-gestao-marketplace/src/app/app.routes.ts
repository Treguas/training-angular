import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { NewProduct } from './pages/new-product/new-product';
import { Products } from './pages/products/products';
import { Layout } from './pages/layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: "login",
    component: Login
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: "products",
        component: Products
      },
      {
        path: "new-product",
        component: NewProduct
      }
    ]
  },
  {
    path: '**', redirectTo: '/login'
  },
];
