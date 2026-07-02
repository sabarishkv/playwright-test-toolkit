import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './base.client';

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

export class PostsClient extends BaseClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async list(): Promise<APIResponse> {
    return this.request.get('/posts');
  }

  async get(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  async create(post: Post): Promise<APIResponse> {
    return this.request.post('/posts', { data: post });
  }
}
