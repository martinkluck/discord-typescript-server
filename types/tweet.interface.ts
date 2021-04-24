export interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  retweeted_status: RetweetedStatus;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: Entities;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  filter_level: string;
  lang: string;
  timestamp_ms: string;
}

export interface Entities {
  hashtags: any[];
  urls: URL[];
  user_mentions: UserMention[];
  symbols: any[];
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: Entities;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  filter_level: string;
  lang: string;
}

export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: null | string;
  url: null | string;
  description: string;
  translator_type: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  lang: null;
  contributors_enabled: boolean;
  is_translator: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  default_profile: boolean;
  default_profile_image: boolean;
  following: null;
  follow_request_sent: null;
  notifications: null;
  withheld_in_countries: any[];
}
