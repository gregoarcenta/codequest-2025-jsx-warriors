export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: null;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: AvatarDecorationData;
  collectibles: null;
  display_name_styles: null;
  banner_color: string;
  clan: Clan;
  primary_guild: Clan;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
  provider: string;
  accessToken: string;
  fetchedAt: Date;
  data: string;
}

export interface AvatarDecorationData {
  asset: string;
  sku_id: string;
  expires_at: number;
}

export interface Clan {
  identity_guild_id: string;
  identity_enabled: boolean;
  tag: string;
  badge: string;
}
