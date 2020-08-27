import { Component, OnInit } from '@angular/core'
import { ExamService } from './service/exam.service'
import { map } from 'rxjs/operators'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    
    data                : any = []
    constructor(
        private service : ExamService
    ) {}
    
    //Initialize data
    ngOnInit(): void {
        this.getPostFromPostAPI()
    }

    //Setup parameter for "Posts" to get it's data
    getPostFromPostAPI() {
        this.getAPIResponse('posts', 'posts', '')
    }

    //Get comments one by one using the 'posts' data
    getCommentForEachPost(posts) {
        this.loop(posts)
    }

    //Loop posts to get it's comment
    loop(posts) {
        posts.forEach(post => {
            this.getComment(post)
        })
    }

    //Get comment by using 'post.id' from the API, we are using one function to get the data by just chaning the parameter
    getComment(post) {
        this.getAPIResponse('comments?postId='+post.id, 'comments', post)
    }

    //This is the function that handles the API, we can use it in different API by just changing parameter and adding some condition
    getAPIResponse(param, from, post) {

        this.service
        .servicePostsfromPostAPI(param)
        .pipe(map(data => data))
        .subscribe(response => {

            if(from === 'comments') {
                //This is the initialized data and once page load, it will display this object data
                this.data.push({
                    post: post,
                    comment: response
                })
            } else {
                //This will get the comment one by one and assign it everytime it has a new response, and by doing this, we will get the exact ID that we need for the comment.
                this.getCommentForEachPost(response)
            }
            
        })
        
    }

}
