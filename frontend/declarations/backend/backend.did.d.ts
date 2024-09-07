import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Tweet {
  'id' : bigint,
  'retweets' : bigint,
  'content' : string,
  'author' : string,
  'likes' : bigint,
  'timestamp' : bigint,
  'handle' : string,
  'comments' : bigint,
}
export interface _SERVICE {
  'createTweet' : ActorMethod<[string, string, string], Tweet>,
  'deleteTweet' : ActorMethod<[bigint], boolean>,
  'getProfileStats' : ActorMethod<[], [bigint, bigint, bigint]>,
  'getTweets' : ActorMethod<[], Array<Tweet>>,
  'updateTweetStats' : ActorMethod<[bigint, bigint, bigint, bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
