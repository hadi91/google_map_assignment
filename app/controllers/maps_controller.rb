class MapsController < ApplicationController
  def index
    @maps = Map.all
  end

  def new
    @map = Map.new
  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user
    respond_to do |format|
      format.js
      format.html
    end
  end


  def map_params
    params.require(:map).permit(:address, :description, :date)
  end

end
