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

    ngOnInit(): void {
        this.getPostFromPostAPI()
    }

    getPostFromPostAPI() {
        this.getAPIResponse('posts', 'posts', '')
    }

    getCommentForEachPost(posts) {
        this.loop(posts)
    }

    loop(posts) {
        posts.forEach(post => {
            this.getComment(post)
        })
    }

    getComment(post) {
        this.getAPIResponse('comments?postId='+post.id, 'comments', post)
    }

    getAPIResponse(param, from, post) {

        this.service
        .servicePostsfromPostAPI(param)
        .pipe(map(data => data))
        .subscribe(response => {

            if(from === 'comments') {
                this.data.push({
                    post: post,
                    comment: response
                })
            } else {
                this.getCommentForEachPost(response)
            }
            
        })
        
    }

}
