package com.example.backend;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name = "Message")  // JPA
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long _id;

    @Column(nullable = false)
    private Long receiver_id;


    @Column(nullable = false)
    private String sender_nickname;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private Timestamp timestamp;

    public Message() {
    }

    public Message(Long _id, Long receiver_id, String sender_nickname, String message, Timestamp timestamp) {
        this._id = _id;
        this.receiver_id = receiver_id;
        this.sender_nickname = sender_nickname;
        this.message = message;
        this.timestamp = timestamp;
    }

    public Long get_id() {
        return _id;
    }

    public void set_id(Long _id) {
        this._id = _id;
    }

    public Long getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(Long receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getSender_nickname() {
        return sender_nickname;
    }

    public void setSender_nickname(String sender_nickname) {
        this.sender_nickname = sender_nickname;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "_id=" + _id +
                ", receiver_id=" + receiver_id +
                ", sender_nickname='" + sender_nickname + '\'' +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
