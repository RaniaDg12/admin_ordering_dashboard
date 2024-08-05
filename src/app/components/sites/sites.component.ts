import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateSite, Site } from '../../interfaces/site';
import { SitesService } from '../../services/sites.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
  ],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})

export class SitesComponent implements OnInit {
  
  sites: Site[] = [];
  siteForm: FormGroup;
  isSidebarClosed = false;
  site: Site | Partial<Site> = {};

  isEditing = false;
  currentSiteId: string | null = null;
  code: string = '';
  name: string = '';

  constructor(private sitesService: SitesService, private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSites();
  }

  handleSidebarToggle(isClosed: boolean): void {
    this.isSidebarClosed = isClosed;
  }

  loadSites(): void {
    this.sitesService.getSites().subscribe(data => {
      this.sites = data;
    });
  }

  openSettingsModal(): void {
    this.name = '';
    this.code = '';
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
      keyboard: false
    });
    settingsModal.show();
  }

  saveSite(): void {
    const newSite: CreateSite = {
      name: this.name,
      code: this.code,
    };

    this.sitesService.addSite(newSite).subscribe(() => {
      this.loadSites();
    });

    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    settingsModal.hide();
  }

  fetchSites(): void {
    this.sitesService.getSites().subscribe(data => {
      this.sites = data;
    });
  }

  deleteSite(id: string): void {
    this.sitesService.deleteSite(id).subscribe(() => {
      this.fetchSites();
    });
  }

  openEditModal(site: Site) {
    this.currentSiteId = site._id;
    this.name = site.name;
    this.code = site.code;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    });
    editModal.show();
  }

  
  updateSite(){
    if (!this.currentSiteId) {
      console.error('No Site selected for update.');
      return;
    }

    const updatedSite: Site = {
      _id: this.currentSiteId,
      name: this.name,
      code: this.code,
    };

    this.sitesService.updateSite(this.currentSiteId, updatedSite).subscribe(() => {
      this.loadSites();
    });

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
  }
}
