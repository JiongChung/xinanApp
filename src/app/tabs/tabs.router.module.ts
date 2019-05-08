import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'mall',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/mall/mall.module#MallPageModule'
                    }
                ]
            },
            {
                path: 'find',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/find/find.module#FindPageModule'
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/account/account.module#AccountPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}
