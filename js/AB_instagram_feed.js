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

                console.log(data);

            for (var i = 0; i < feedLength; i++) {

                var instagramFeedNode = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges[i].node;

                var instagramPhotoShortCode = instagramFeedNode.shortcode,
                    instagramPhotoThumbnailUrl = instagramFeedNode.thumbnail_src,
                    instagramPhotoLikeCount = instagramFeedNode.edge_liked_by.count,
                    instagramPhotoCommentCount = instagramFeedNode.edge_media_to_comment.count;

                instagramElement.innerHTML += '<li><a rel="nofollow" href="https://www.instagram.com/p/' + instagramPhotoShortCode + '"><div class="instagram-item-overlay"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.1 49.3" style="enable-background:new 0 0 54.1 49.3;" xml:space="preserve"><path class="st0" d="M27.9,5.1L27.1,6l-0.8-0.8c-5.9-5.9-15.6-5.9-21.5,0c-5.9,5.9-5.9,15.6,0,21.5l0.8,0.8l21.5,21.5l21.5-21.5 l0.8-0.8c5.9-5.9,5.9-15.6,0-21.5C43.5-0.8,33.8-0.8,27.9,5.1z"></path></svg>' + instagramPhotoLikeCount + ' <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.1 49.3" style="enable-background:new 0 0 54.1 49.3;" xml:space="preserve"><path class="st0" d="M48.9,38.7c3.1-4,4.8-8.8,4.8-14C53.7,11.2,41.8,0.2,27,0.2S0.4,11.2,0.4,24.6S12.3,49.1,27,49.1 c5.3,0,10.3-1.4,14.4-3.9l11.3,2.9L48.9,38.7z"></path></svg>' + instagramPhotoCommentCount + '</div><img src=' + instagramPhotoThumbnailUrl + ' alt=""></a></li>';
            }
        }
    };
}