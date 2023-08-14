package com.in28minutes.learnspringboot.courses.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Course {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column
	private String name;
	private int count;
	
	public Course() {}
	
	public Course(long id, String name, int count) {
		super();
		this.id = id;
		this.name = name;
		this.count = count;
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", name=" + name + ", count=" + count + "]";
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int string) {
		this.count = string;
		
	}
	
	
}
