package com.grumpymaps.GrumpyMaps.model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Square implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int mapSquareId;
    private String mapCoordinate;
    private String squareHeightWidth;
    private int squareSize;
    private boolean obstructed;
    private int mapHeightWidth;
    private boolean inRange;

    private Integer mapId;

    @Transient
    private ArrayList<Player> players;
    private int numberofPlayers;


	/**
	* Returns value of id
	* @return
	*/
	public long getId() {
		return id;
	}

	/**
	* Sets new value of id
	* @param
	*/
	public void setId(long id) {
		this.id = id;
	}

	/**
	* Returns value of mapSquareId
	* @return
	*/
	public int getMapSquareId() {
		return mapSquareId;
	}

	/**
	* Sets new value of mapSquareId
	* @param
	*/
	public void setMapSquareId(int mapSquareId) {
		this.mapSquareId = mapSquareId;
	}

	/**
	* Returns value of mapCoordinate
	* @return
	*/
	public String getMapCoordinate() {
		return mapCoordinate;
	}

	/**
	* Sets new value of mapCoordinate
	* @param
	*/
	public void setMapCoordinate(String mapCoordinate) {
		this.mapCoordinate = mapCoordinate;
	}

	/**
	* Returns value of squareHeightWidth
	* @return
	*/
	public String getSquareHeightWidth() {
		return squareHeightWidth;
	}

	/**
	* Sets new value of squareHeightWidth
	* @param
	*/
	public void setSquareHeightWidth(String squareHeightWidth) {
		this.squareHeightWidth = squareHeightWidth;
	}

	/**
	* Returns value of squareSize
	* @return
	*/
	public int getSquareSize() {
		return squareSize;
	}

	/**
	* Sets new value of squareSize
	* @param
	*/
	public void setSquareSize(int squareSize) {
		this.squareSize = squareSize;
	}

	/**
	* Returns value of obstructed
	* @return
	*/
	public boolean isObstructed() {
		return obstructed;
	}

	/**
	* Sets new value of obstructed
	* @param
	*/
	public void setObstructed(boolean obstructed) {
		this.obstructed = obstructed;
	}

	/**
	* Returns value of mapHeightWidth
	* @return
	*/
	public int getMapHeightWidth() {
		return mapHeightWidth;
	}

	/**
	* Sets new value of mapHeightWidth
	* @param
	*/
	public void setMapHeightWidth(int mapHeightWidth) {
		this.mapHeightWidth = mapHeightWidth;
	}

	/**
	* Returns value of inRange
	* @return
	*/
	public boolean isInRange() {
		return inRange;
	}

	/**
	* Sets new value of inRange
	* @param
	*/
	public void setInRange(boolean inRange) {
		this.inRange = inRange;
	}

	/**
	* Returns value of players
	* @return
	*/
	public ArrayList<Player> getPlayers() {
		return players;
	}

	/**
	* Sets new value of players
	* @param
	*/
	public void setPlayers(ArrayList<Player> players) {
		this.players = players;
	}

	/**
	* Returns value of dndMap
	* @return
	*/
	public int getMapId() {
		return mapId;
	}

	/**
	* Sets new value of dndMap
	* @param
	*/
	public void setMapId(int mapId) {
		this.mapId = mapId;
	}

    /**
	* Returns value of numberofPlayers
	* @return
	*/
	public int getNumberofPlayers() {
		return numberofPlayers;
	}

	/**
	* Sets new value of numberofPlayers
	* @param
	*/
	public void setNumberofPlayers(int numberofPlayers) {
		this.numberofPlayers = numberofPlayers;
	}

}
