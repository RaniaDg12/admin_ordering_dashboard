import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateArticle, Article } from '../../interfaces/article';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticlesService } from '../../services/articles.service'; // Import the ArticlesService class


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  
  articles: Article[] = [];
  articleForm: FormGroup;
  isSidebarClosed = false;
  article: Article | Partial<Article> = {};

  isEditing = false;
  currentArticleId: string | null = null;
  name: string = '';

  constructor(private articlesService: ArticlesService, private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  handleSidebarToggle(isClosed: boolean): void {
    this.isSidebarClosed = isClosed;
  }

  loadArticles(): void {
    this.articlesService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  openSettingsModal(): void {
    this.name = '';
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
      keyboard: false
    });
    settingsModal.show();
  }

  saveArticle(): void {
    const newArticle: CreateArticle = {
      name: this.name,
    };

    this.articlesService.addArticle(newArticle).subscribe(() => {
      this.loadArticles();
    });

    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    settingsModal.hide();
  }

  fetchArticles(): void {
    this.articlesService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  deleteArticle(id: string): void {
    this.articlesService.deleteArticle(id).subscribe(() => {
      this.fetchArticles();
    });
  }

  openEditModal(article: Article) {
    this.currentArticleId = article._id;
    this.name = article.name;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    });
    editModal.show();
  }

  
  updateArticle(){
    if (!this.currentArticleId) {
      console.error('No Article selected for update.');
      return;
    }

    const updatedArticle: Article = {
      _id: this.currentArticleId,
      name: this.name,
    };

    this.articlesService.updateArticle(this.currentArticleId, updatedArticle).subscribe(() => {
      this.loadArticles();
    });

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
  }
}
