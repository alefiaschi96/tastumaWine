import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

interface UserState {
  isAuthenticated: boolean;
  permission: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: SupabaseClient;

  private userStateSubject = new BehaviorSubject<UserState>({
    isAuthenticated: !!sessionStorage.getItem('permissions'),
    permission: sessionStorage.getItem('permissions') || null,
  });

  public userState$ = this.userStateSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );

    this.supabase.auth.onAuthStateChange((_, session) => {
      this.updateUserState(session?.user || null);
    });
  }

  private updateUserState(session: any) {
    if (session) {
      const userPermissions = session.user_metadata.role;

      let permission = null;
      if (userPermissions) {
        permission = session.user_metadata.role;
        sessionStorage.setItem('permissions', permission);
      }

      this.userStateSubject.next({
        isAuthenticated: true,
        permission: permission,
      });
    } else {
      sessionStorage.clear();
      this.userStateSubject.next({
        isAuthenticated: false,
        permission: null,
      });
    }
  }

  async signUp(email: string, password: string, options?: any) {
    const response = await this.supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: options,
    });
    return response;
  }

  async signIn(email: string, password: string) {
    const response = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.data && response.data.user) {
      this.updateUserState(response.data.user);
    }
    return response;
  }

  async signOut() {
    const response = await this.supabase.auth.signOut();
    this.updateUserState(null);
    return response;
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChanged(callback: any) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  createUser(email: string, password: string, role: string) {
    return this.supabase.functions.invoke('createUser', {
      body: { email, password, role }
    });
  }
}
