/**
 * AB_instagram_feed
 * version: 1.0.0
 *
 * AB_instagram_feed() displays a select number of posts using a given username
 *
 * @param {string} userName - Instagram username 
 * @param {number} feedLength - Number of posts to display
 */

function instagramFeed(userName, feedLength) {

    var instagramUser = userName;

    var instagramElement = document.getElementById('instagramFeed');

    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.instagram.com/' + instagramUser);
        xhr.send();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {

            var data = xhr.responseText.split("window._sharedData = ")[1].split("<\/script>")[0];
                data = JSON.parse(data.substr(0, data.length - 1));

            for (var i = 0; i < feedLength; i++) {

                var instagramFeedNode = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[i].node;

                var instagramPhotoShortCode = instagramFeedNode.shortcode,
                    instagramPhotoThumbnailUrl = instagramFeedNode.thumbnail_src;

                instagramElement.innerHTML += '<li><a rel="nofollow" href="https://www.instagram.com/p/' + instagramPhotoShortCode + '"><img src=' + instagramPhotoThumbnailUrl + ' alt=""></a></li>';
            }

            instagramElement.innerHTML += '</ul>';
        }
    };
}