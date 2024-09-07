import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor TwitterClone {
  type Tweet = {
    id: Int;
    author: Text;
    handle: Text;
    content: Text;
    likes: Int;
    retweets: Int;
    comments: Int;
    timestamp: Int;
  };

  var tweets : [Tweet] = [];
  var nextTweetId : Int = 1;

  public func createTweet(author: Text, handle: Text, content: Text) : async Tweet {
    let tweet : Tweet = {
      id = nextTweetId;
      author = author;
      handle = handle;
      content = content;
      likes = 0;
      retweets = 0;
      comments = 0;
      timestamp = Time.now();
    };
    tweets := Array.append(tweets, [tweet]);
    nextTweetId += 1;
    tweet
  };

  public query func getTweets() : async [Tweet] {
    Array.reverse(tweets)
  };

  public func updateTweetStats(tweetId: Int, likes: Int, retweets: Int, comments: Int) : async Bool {
    tweets := Array.map<Tweet, Tweet>(tweets, func (tweet) {
      if (tweet.id == tweetId) {
        {
          id = tweet.id;
          author = tweet.author;
          handle = tweet.handle;
          content = tweet.content;
          likes = likes;
          retweets = retweets;
          comments = comments;
          timestamp = tweet.timestamp;
        }
      } else {
        tweet
      }
    });
    true
  };

  public func deleteTweet(tweetId: Int) : async Bool {
    let oldLen = tweets.size();
    tweets := Array.filter<Tweet>(tweets, func(tweet) { tweet.id != tweetId });
    tweets.size() < oldLen
  };

  public query func getProfileStats() : async (Int, Int, Int) {
    let tweetCount = tweets.size();
    // For simplicity, we're using fixed values for following and followers
    (tweetCount, 500, 1500)
  };
}
