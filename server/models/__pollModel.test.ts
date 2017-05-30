import * as mongoose from 'mongoose';

import PollModel, {PollSchemaModel} from './pollModel'

const db_url = `mongodb://localhost:27017/db`;

describe('PollModel userIdTesting', () => {
    const userId = '------userid'
    beforeAll(() => {
        mongoose.connect(db_url);
    })
    afterEach(() => {
        mongoose.connection.collections['polls'].drop();
    })
    afterAll(() => {

        mongoose.disconnect()
    })

    it('save data', (done) => {
        const saveData = {
            title: 'How is going?', options: [{content: 'A1'}, {content: 'A2'}]
        }

        const expected = {}
        const pollModel = new PollModel(userId)

        pollModel.savePoll(saveData)
            .then((doc: any) => {
                expect(pollModel._id).toEqual(doc._id)
                done()
            }).catch(err => {
            done()
        })
    })

    it('update data', (done) => {

        const saveData = {
            title: 'How is going?', options: [{content: 'A1'}, {content: 'A2'}]
        }

        const expected = {}
        const pollModel = new PollModel(userId)

        const updateData = {
            options: [{
                content: 'A1_1'
            }, {

                content: 'A2_2'
            }
            ]
        }

        pollModel.savePoll(saveData)
            .then((doc: any) => {
                expect(pollModel._id).toEqual(doc._id)
                return pollModel.updatePoll(updateData)
            })
            .then(data => {
                PollSchemaModel.find({title: saveData.title}, function (err, poll: any) {
                    const obj = poll[0].toObject()
                    expect(obj.options).toEqual(updateData.options)
                    done();
                })

            })

            .catch(err => {
                expect(err.message).toEqual('')
                done()
            })
    })

    it('get All Answer by user id', (done) => {

        const saveData = {
            title: 'How is going?', options: [{content: 'A1'}, {content: 'A2'}]
        }

        const expected = {}

        let savePromises =[];

        for (let i = 0; i < 5; i++) {
            let pollModel
            if (i % 2 == 0) {
                pollModel = new PollModel(userId+"--odd")
            }else{
                pollModel = new PollModel(userId)

            }
            saveData.options.push({
                content:i+"  -    A"+i
            })
            savePromises.push(pollModel.savePoll(saveData));
        }

        Promise.all(savePromises)
            .then(_=>{
                PollModel.getAllPollByUserId(userId)
                    .then((data:any)=>{
                        expect(data.length).toEqual(2)
                        done()
                    })
            })
    })
})