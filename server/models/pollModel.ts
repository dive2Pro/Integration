import {model, Schema} from 'mongoose'

const OptionSchema = new Schema({
    content: String
}, {_id: false})

const PollSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    options: [OptionSchema],
    answerId: String
})

const AnswerSchema = new Schema({
    pollId: {
        type: Schema.Types.ObjectId, ref: 'Poll'
    },
    optionsAnswers: {
        type: Object
    }
})


const PollSchemaModel = model("Poll", PollSchema)
const AnswerModel = model("Answer", AnswerSchema)

/**
 * 需要两个 schema
 *     1. 记录投票的问题选项
 *         - 题目
 *         - 选项
 *         - 答案的id
 *
 *     // 每次提交答案后即更新结果 1 对 1 更新
 *     2. 记录投票的结果
 *         - 关联问题id
 *         - optionsAnswer:
 */

class Poll {
    _id: string
    _pollSchemaModel: any
    userId: string

    constructor(userId) {
        this.userId = userId
    }

    static getAllPollByUserId(_id: string) {

        return new Promise((resolve, reject) => {
            PollSchemaModel.find({userId: _id}, function (err, doc:any) {
                if(err)reject(err)
                else{
                    resolve(doc)
                }
            })
        })
    }

    savePoll(saveObj) {

        const poll = this
        if (poll._id) {
            return poll.updatePoll(saveObj)
        } else {
            saveObj = Object.assign(saveObj, {userId: poll.userId})
            return new Promise((resolve, reject) => {
                try {
                    const pm = new PollSchemaModel(saveObj)
                    pm.save(function (err) {
                        if (err) {
                            reject(err)
                        } else {
                            poll._id = pm._id
                            poll._pollSchemaModel = pm
                            resolve(pm);
                        }
                    })
                } catch (e) {
                    reject(e)
                }
            })
        }
    }

    updatePoll(updateObj) {
        const poll = this
        return new Promise((resolve, reject) => {
            PollSchemaModel.findOneAndUpdate({_id: poll._id}, updateObj, function (err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }

    saveAnswer() {

    }


}

export {Poll as default, PollSchemaModel}