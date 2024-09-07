export const idlFactory = ({ IDL }) => {
  const Tweet = IDL.Record({
    'id' : IDL.Int,
    'retweets' : IDL.Int,
    'content' : IDL.Text,
    'author' : IDL.Text,
    'likes' : IDL.Int,
    'timestamp' : IDL.Int,
    'handle' : IDL.Text,
    'comments' : IDL.Int,
  });
  return IDL.Service({
    'createTweet' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Tweet], []),
    'deleteTweet' : IDL.Func([IDL.Int], [IDL.Bool], []),
    'getProfileStats' : IDL.Func([], [IDL.Int, IDL.Int, IDL.Int], ['query']),
    'getTweets' : IDL.Func([], [IDL.Vec(Tweet)], ['query']),
    'updateTweetStats' : IDL.Func(
        [IDL.Int, IDL.Int, IDL.Int, IDL.Int],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
