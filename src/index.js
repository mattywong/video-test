import './styles.css';

document.getElementById('app').innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const decodeQueryString = function(queryString) {
  var key, keyValPair, keyValPairs, r, val, _i, _len;
  r = {};
  keyValPairs = queryString.split('&');
  for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
    keyValPair = keyValPairs[_i];
    key = decodeURIComponent(keyValPair.split('=')[0]);
    val = decodeURIComponent(keyValPair.split('=')[1] || '');
    r[key] = val;
  }
  return r;
};
const decodeStreamMap = function(url_encoded_fmt_stream_map) {
  var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
  sources = {};
  _ref = url_encoded_fmt_stream_map.split(',');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    urlEncodedStream = _ref[_i];
    stream = decodeQueryString(urlEncodedStream);
    type = stream.type.split(';')[0];
    quality = stream.quality.split(',')[0];
    stream.original_url = stream.url;
    stream.url = '' + stream.url + '&signature=' + stream.sig;
    sources['' + type + ' ' + quality] = stream;
  }
  return sources;
};

const test = async () => {
  fetch(
    'https://cors-anywhere.herokuapp.com/youtube.com/get_video_info?video_id=7drvFEh_T80',
    {
      method: 'GET',
      dataType: 'text',
    },
  )
    .then(res => {
      return res.text();
    })
    .then(data => {
      const video = decodeQueryString(data);

      console.log(video);

      // const sources = decodeStreamMap(video.url_encoded_fmt_stream_map);
      // console.log(sources);
      if (video.status === 'fail') {
        throw Error('Failed');
      }
    });

  // return $.ajax({
  //   url: "http://www.youtube.com/get_video_info?video_id=" + id,
  //   dataType: "text"
  // }).done(function(video_info) {
  //   var video;
  //   video = YoutubeVideo.decodeQueryString(video_info);
  //   if (video.status === "fail") {
  //     return callback(video);
  //   }
  //   video.sources = YoutubeVideo.decodeStreamMap(video.url_encoded_fmt_stream_map);
  //   video.getSource = function(type, quality) {
  //     var exact, key, lowest, source, _ref;
  //     lowest = null;
  //     exact = null;
  //     _ref = this.sources;
  //     for (key in _ref) {
  //       source = _ref[key];
  //       if (source.type.match(type)) {
  //         if (source.quality.match(quality)) {
  //           exact = source;
  //         } else {
  //           lowest = source;
  //         }
  //       }
  //     }
  //     return exact || lowest;
  //   };
  //   return callback(video);
  // });
};

test();
