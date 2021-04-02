export interface Heroku {
  id: string;
  data: Data;
  actor: Actor;
  action: string;
  version: string;
  resource: string;
  sequence: any;
  created_at: string;
  updated_at: string;
  published_at: string;
  previous_data: PreviousData;
  webhook_metadata: WebhookMetadata;
}

export interface Data {
  id: string;
  app: App;
  slug: Slug;
  user: User;
  status: string;
  current: boolean;
  pstable: Pstable;
  version: number;
  created_at: string;
  updated_at: string;
  description: string;
  addon_plan_names: any[];
  output_stream_url: any;
}

export interface App {
  id: string;
  name: string;
}

export interface Slug {
  id: string;
  commit: string;
  commit_description: string;
}

export interface User {
  id: string;
  email: string;
}

export interface Pstable {
  web: Web;
  worker: Worker;
}

export interface Web {
  slug: Slug2;
  command: string;
}

export interface Slug2 {
  id: string;
}

export interface Worker {
  slug: Slug3;
  command: string;
}

export interface Slug3 {
  id: string;
}

export interface Actor {
  id: string;
  email: string;
}

export interface PreviousData {}

export interface WebhookMetadata {
  attempt: Attempt;
  delivery: Delivery;
  event: Event;
  webhook: Webhook;
}

export interface Attempt {
  id: string;
}

export interface Delivery {
  id: string;
}

export interface Event {
  id: string;
  include: string;
}

export interface Webhook {
  id: string;
}
