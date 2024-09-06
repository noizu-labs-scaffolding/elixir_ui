defmodule ElixirUITest do
  use ExUnit.Case
  doctest ElixirUI

  test "greets the world" do
    assert ElixirUI.hello() == :world
  end
end
